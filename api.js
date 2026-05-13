class ApiClient {
    constructor() {
        this.baseURL = 'https://dummyjson.com/products'
    }
    
    async obtenerProductos(page, items) {
        const skip = (page - 1) * items
        const url = `${this.baseURL}?limit=${items}&skip=${skip}&select=title,price,description,thumbnail`
        
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
}

export const api = new ApiClient()