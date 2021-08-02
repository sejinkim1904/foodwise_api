/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
const preset = 'ts-jest';
const testEnvironment = 'node';
const transform = { '^.+\\.ts?$': 'ts-jest' };
const moduleFileExtensions = ['ts', 'js', 'json', 'node'];
const testPathIgnorePatterns = ['/node_modules/', '/<rootDir>/source/config'];
