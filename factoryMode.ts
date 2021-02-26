// 工厂方法模式
// 亦称： 虚拟构造函数、Virtual Constructor、Factory Method
//  意图
// 工厂方法模式是一种创建型设计模式， 其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。


/** 
产品接口声明所有具体产品必须执行的操作。
 */
interface Product {
	operation(): string;
}
/**
  Creator类声明了应该返回Product类对象的工厂方法。创建者的子类通常提供此方法的实现。
 */
abstract class Creator {
    /**
   		请注意，创建者可能还会提供一些工厂方法的默认实现。
     */
	public abstract factoryMethod(): Product;

	/**另请注意，尽管其名称如此，创建者的主要责任不是创造产品。 
   通常，它包含一些依赖于Product对象的核心业务逻辑，
   这些逻辑是由factory方法返回的。 
   子类可以通过覆盖工厂方法并从中返回不同类型的产品来间接更改该业务逻辑。
   */
	public someOperation(): string {
		// 调用工厂方法创建一个Product对象。
		const product = this.factoryMethod();
		// 现在，使用产品。
		return `创建者：代码和 ${product.operation()}使用`;
	}
}



/**
具体的创建者会覆盖工厂方法，以更改最终产品的类型。
*/
class ConcreteCreator1 extends Creator {

	/**
	   请注意，即使实际从该方法返回了具体产品，该方法的签名仍然使用抽象产品类型。 这样，创建者可以独立于具体的产品类别。
		*/
	public factoryMethod(): Product {
		return new ConcreteProduct1();
	}
}

class ConcreteCreator2 extends Creator {
	public factoryMethod(): Product {
		return new ConcreteProduct2();
	}
}



/** 
具体产品提供产品接口的各种实现。
 */
class ConcreteProduct1 implements Product {
	public operation(): string {
		return '{ ConcreteProduct1}';
	}
}

class ConcreteProduct2 implements Product {
	public operation(): string {
		return '{ ConcreteProduct2}';
	}
}

/** 
客户端代码虽然通过其基本接口与具体创建者的实例一起工作。 只要客户端继续通过基本接口与创建者合作，就可以将其传递给任何创建者的子类。
 */
function clientCode(creator: Creator) {
	// ...
	console.log('客户端：我不知道创建者的，但是仍然可以工作。');
	console.log(creator.someOperation());
	// ...
}

/** 
应用程序根据配置或环境选择创建者的类型。
 */
console.log('执行 ConcreteCreator1.');
clientCode(new ConcreteCreator1());

console.log('执行 ConcreteCreator2.');
clientCode(new ConcreteCreator2());