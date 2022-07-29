var script_root = "/home/student_id/training/Gor/gaus/JAVA_SCRIPT_VERSION"
const Matrix = require ('./matrix.js')

/* Custom error*/
class Error {
  	constructor(message) {
    		this.message = message;
    		this.name = "Error"; // (different names for different built-in error classes)
	  }
}

/* Read content from file */
function read_from_file() {
	try {
		if (process.argv.length < 3) {
		       console.log('Usage: node ' + process.argv[1] + ' input.txt')
		       process.exit(1);
		}
		// Read the file and print its contents.
		let fs = require('fs'), filename = process.argv[2];
		let argument =  fs.readFileSync(filename, 'utf8') 
		argument = argument.split(/[\s]/)
		return argument
	}
	catch(err) {
		console.log("File of this name exist")
		process.exit(0);
	}
}

/* Test result equal to golden or nor */
function test_result(input_data, output_data) {
	try {
		let fs = require('fs');
		let golden_result =  fs.readFileSync(script_root + "/golden.txt", 'utf8') 
		let ans = output_data.localeCompare(golden_result)
		fs.writeFile(script_root + '/output.txt', output_data + "\n", err => {
			if (err) {
				console.error(err)
				return
			} }
		)
		if (output_data.localeCompare(golden_result) == -1) {
			const fs = require('fs')
			fs.writeFile(script_root + '/result.txt', input_data + "\t result \t " + output_data + "   " + " ---> Passed\n", err => {
				if (err) {
					console.error(err)
					return
				} })
		} else {
			const fs = require('fs')
			fs.writeFile(script_root + '/result.txt', input_data + "\t result \t " + output_data + "   " + " ---> Failed\n", err => {
				if (err) {
					console.error(err)
					return
				} })
		}
	} 
	catch(err) {
		console.log("Golden  file exist")
		process.exit(0);
	}
}

/* Initalize Matrix from file */
function initalize_matrix() {
	try {
                let argument = read_from_file();
                let row = parseFloat((argument[0]))
		let column = row + 1;
                arg_index = parseFloat((1))
		argument.splice(1, 1)
		argument.pop()
		if (argument.length != ((row * column) + 1)) {
			throw "Invalid value"
		}
                let matrix = []
                for (let i = 0; i < row; i++) {
                        matrix[i] = []
                        for (let j = 0; j < row + 1 ; j++) {
                                if (isNaN(argument[arg_index])) {
                                } else {
                                        matrix[i][j] = parseFloat(argument[arg_index++])
                                }
                        }
                }
              return matrix
	} catch(err) {
		console.log("Invalid value")
		process.exit(0);
	}
}

function GausMethodSolver(a,n) {
        let flag = 0;
        // Performing elementary operations
        for (let i = 0; i < n; i++) {
                if (a[i][i] == 0) {
                        let c = 1;
                        while ((i + c) < n && a[i + c][i] == 0)
                                c++;        
                        if ((i + c) == n) {
                                flag = 1;
                                break;
                        }
                        for (let j = i, k = 0; k <= n; k++) {
                                let temp =a[j][k];
                                a[j][k] = a[j+c][k];
                                a[j+c][k] = temp;
                        }
                }
                for (let j = 0; j < n; j++) {
                    // Excluding all i == j
                        if (i != j) {
                                // Converting Matrix to reduced row
                                // echelon form(diagonal matrix)
                                let p = a[j][i] / a[i][i];
                                for (let k = 0; k <= n; k++)                
                                a[j][k] = a[j][k] - (a[i][k]) * p;            
                        }
                }
        }
        return flag;
}

// To check whether infinite solutions
// exists or no solution exists
function CheckConsistency(a,n,flag) {
        // flag == 2 for infinite solution
        // flag == 3 for No solution
        flag = 3;
        for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let j = 0; j < n; j++) {
                        sum = sum + a[i][j];
                	if (sum == a[i][j])
                        	flag = 2;
		}
         }
         return flag;
}

/* Check result is valid  */
function result_checker(matrix, n) {
        let x1, x2, x3
        let res = ""
        for (let i = 0; i < n; ++i) {
                for (let j = 0; j < n; ++j) {
                        if (i == 0 && matrix[i][j] != 0) {
                                x1 = matrix[i][n] / matrix[i][j] 
				res = res.concat(x1, " ")
                        }
                        if (i == 1 && matrix[i][j] != 0) {
                                x2 = matrix[i][n] / matrix[i][j] 
				res = res.concat(x2, " ")
                        }
                        if (i == 2 && matrix[i][j] != 0) {
                                x3 = matrix[i][n] / matrix[i][j] 
				res = res.concat(x3, " ")
                        }
                        if (i == 3 && matrix[i][j] != 0) {
                                x4 = matrix[i][n] / matrix[i][j] 
				res = res.concat(x4, " ")
                        }
                        if (i == 4 && matrix[i][j] != 0) {
                                x5 = matrix[i][n] / matrix[i][j] 
				res = res.concat(x5)
                        }
                }
        }
        return res
}

// Get output data after solving equation
function get_output_data (obj) {
	let input_data = obj.get_matrix()
	let argument = read_from_file()
        let order_matrix = parseFloat((argument[0]))
        let flag = 0;
        flag = GausMethodSolver(input_data, order_matrix)
        if (flag == 1) flag = CheckConsistency(input_data, order_matrix, flag);
        output_data = result_checker(input_data, order_matrix)
	return output_data
}

function main() {
        input_data = initalize_matrix()
	let obj = new Matrix(input_data)
	output_data = get_output_data(obj)
        test_result(input_data, output_data)
}

main()
