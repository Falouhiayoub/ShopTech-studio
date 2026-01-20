import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAi.getGenerativeModel({model: 'gemini-1.5-flash'})

export async function POST(request) {
    try {
        const {sales, products} = await request.json()

        const prompt = `
        Analyze the following stock and sales data and provide a concise summary in French.
        Include total sales value, top performing product, categories with high demand, and stock replenishment advice
        
        Product Data:
        ${JSON.stringify(products, null, 2)}
        
        Sales Data: 
        ${JSON.stringify(sales, null, 2)}
        `

        const result = await model.generateContent(prompt)
        const analysisText = result.response.text()

        return NextResponse.json({analysis: analysisText})
    } catch (error) {
        console.error("Gemini Analysis Error: ", error)
        return NextResponse.json({error : 'Failed To generate analysis'}, {status: 500})
    }
}