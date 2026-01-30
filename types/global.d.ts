export { }

declare global {
    var certificates: {
        [key: string]: {
            name: string
            program: string
            email: string
            issueDate: string
        }
    }
}
