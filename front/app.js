Alpine.data('appcontext', ()=>({
    modelname: 'users',
    API: 'http://localhost:3000/',
    async getSchema(){
        let res = await axios.get(`${this.API}${this.modelname}/schema`);
        console.log(res);
    }
}))