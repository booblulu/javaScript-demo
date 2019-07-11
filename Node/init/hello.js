function hello() {
    var str;
    this.set = (value)=>{
        str = value
    }
    this.get = ()=>{
        console.log(str);
    }
}

module.exports = hello;