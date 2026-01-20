const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './'
})

//custom configuration

const customJestConfig = {
    setupFilesAfterEnv : ['<rootDir>/jest.setup.js'],
    testEnvironment : 'jest-environement-jsdom',
    moduleNameMapper: {
        //handle module aliases
        '^@/(.*)$': '<rootDir>/$1',
    }
}

module.exports = createJestConfig(customJestConfig)