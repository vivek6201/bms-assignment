const { default: z } = require("zod");

const bookValidation = z.object({
    name: z.string().min(3),
    author: z.string().min(3),
    shortDescription: z.string().min(10),
    publisher: z.string()
})

module.exports = bookValidation;