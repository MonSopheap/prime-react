class RoleService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getRols() {
        try {
            const response = await this.httpClient.get("http://localhost:4000/role/gets");
            console.log(`RESPONSE:`, response)
            return response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


export default RoleService;