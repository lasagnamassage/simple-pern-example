const { exec } = require('child_process')

/**
 * Checks if dependencies are installed on user's device
 * using '--version' flag for given aliases
 * @param {String} dependency 
 * @returns {Error | true}
 */
const dependencyCheck = (dependency, installFn) => { 
    let failedSearchRegexTerm = new RegExp(`/command not found: ${dependency}`);
    if (stdout.match(failedSearchRegexTerm)) 
        console.warn(`You need to install ${dependency}. Enter 'Y' to install now: `);
    else {
        return true
    }
}

const nodeCheck = exec('node --version', (error, stdout, stderr) => {
    if (error) {
        console.error(error.message)
        return Error(error)
    }
    dependencyCheck('node', )

    if (stdout.match(/command not found: node/)) {

    }

    
        
})



console.log(nodeCheck)