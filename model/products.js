let id = 0;

function nextId() {
    id++;
    return 'p' + id;
}

class Product {
    constructor(name, manufacturer, price) {
        this.id = nextId();
        this.name = name;
        this.manufacturer = manufacturer;
        this.price = price;
    }
}

let products = [
    new Product('iPhone 7', 'Apple', 6000),
    new Product('ThinkPad T440', 'Lenovo', 4999),
    new Product('LBP 2900', 'Canon', 1090)
];


module.exports = {
    // 获取全部
    getProducts: () => {
        return products;
    },


    // 获取某一个
    getProduct: (id) => {
        let pro = products.filter((pro) => {
            if (pro.id === id) {
                return pro;
            }
        });

        // 找不到 返回 Null
        return pro.length == 0 ? null : pro;
    },


    // 添加一个新的
    addProduct: (name, manufacturer, price) => {
        let p = new Product(name, manufacturer, price);
        let flag = false;
        products.map((pro) => {
            if (pro.name == p.name && pro.price == p.price) {
                flag = true;
            }
        });

        if (!flag) {
            products.push(p);
            // 返回 新添加的那个
            return p;
        } else {
            return null;
        }
    },


    // 删除一个
    deleteProduct: (id) => {
        let index1 = -1;
        products.map((pro, index) => {
            if (pro.id === id) {
                index1 = index;
            }
        });

        // 返回 被删除的那个
        return index1 >= 0 ? products.splice(index1, 1)[0] : null;
    },


    // 更新一个
    updateProduct: (id, price) => {
        let pro = products.filter((pro) => {
            if (pro.id === id) {
                pro.price = price;
                return pro;
            }
        });

        // 返回被更新的那个
        return pro.length > 0 ? pro : null;
    }
}