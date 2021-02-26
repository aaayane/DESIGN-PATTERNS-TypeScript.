/** 
  抽象工厂接口声明了一组能返回不同抽象产品的方法。这些产品属于同一个系列且在高层主题或概念上具有相关性。同系列的产品通常能相互搭配使用。系列产品可有多个变体，但不同变体的产品不能搭配使用。
 */
interface AbstractFactory {
	createProductA(): AbstractProductA;

	createProductB(): AbstractProductB;
}

/** 
具体工厂可生成属于同一变体的系列产品。工厂会确保其创建的产品能相互搭配使用。具体工厂方法签名会返回一个抽象产品，但在方法内部则会对具体产品进行实例化。
 */
class ConcreteFactory1 implements AbstractFactory {
	public createProductA(): AbstractProductA {
		return new ConcreteProductA1();
	}

	public createProductB(): AbstractProductB {
		return new ConcreteProductB1();
	}
}

/** 
  每个具体工厂中都会包含一个相应的产品变体。
 */
class ConcreteFactory2 implements AbstractFactory {
	public createProductA(): AbstractProductA {
		return new ConcreteProductA2();
	}

	public createProductB(): AbstractProductB {
		return new ConcreteProductB2();
	}
}

/** 
 系列产品中的特定产品必须有一个基础接口。所有产品变体都必须实现这个接口。
 */
interface AbstractProductA {
	usefulFunctionA(): string;
}

/** 
  具体产品由相应的具体工厂创建。
 */
class ConcreteProductA1 implements AbstractProductA {
	public usefulFunctionA(): string {
		return 'The result of the product A1.';
	}
}

class ConcreteProductA2 implements AbstractProductA {
	public usefulFunctionA(): string {
		return 'The result of the product A2.';
	}
}

/** 
 这是另一个产品的基础接口。所有产品都可以互动，但是只有相同具体变体的产
// 品之间才能够正确地进行交互。
 */
interface AbstractProductB {
    /**
 产品B能够做自己的事...
     */
	usefulFunctionB(): string;

    /**
 ...但是它也可以与ProductA合作。抽象工厂确保其创建的所有产品都属于相同的变体，因此兼容。
     */
	anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/** 
  这些产品是由相应的工厂创建的。
 */
class ConcreteProductB1 implements AbstractProductB {

	public usefulFunctionB(): string {
		return 'The result of the product B1.';
	}

    /**
产品B1的变体只能与该变体一起正常使用，产品A1。 不过，它接受AbstractProductA的任何实例作为一个争论。
     */
	public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
		const result = collaborator.usefulFunctionA();
		return `The result of the B1 collaborating with the (${result})`;
	}
}

class ConcreteProductB2 implements AbstractProductB {

	public usefulFunctionB(): string {
		return 'The result of the product B2.';
	}

    /**
产品B2的变体只能与该变体一起正常使用，产品A2。 不过，它接受AbstractProductA的任何实例作为一个争论。
     */
	public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
		const result = collaborator.usefulFunctionA();
		return `The result of the B2 collaborating with the (${result})`;
	}
}

/** 
客户端代码仅通过抽象类型（AbstractFactory和AbstractProduct）与工厂和产品一起使用。 这使您可以将任何工厂或产品子类传递给客户端代码，而不会破坏它。
 */
function clientCode(factory: AbstractFactory) {
	const productA = factory.createProductA();
	const productB = factory.createProductB();

	console.log(productB.usefulFunctionB());
	console.log(productB.anotherUsefulFunctionB(productA));
}

/** 
  客户端代码可以与任何具体的工厂类一起使用。
 */
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());