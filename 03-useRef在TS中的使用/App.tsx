import React, { useRef } from 'react';

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const getInput = () => {
    console.log(inputRef.current?.value)
  }

  const linkRef = useRef<HTMLAnchorElement>(null)
  const getLink = (e) => {
    console.log(e);
    console.log(linkRef.current!)
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={getInput}>获取DOM</button>
      <a href="http://baidu.com" ref={linkRef}>百度一下</a>
      <button onClick={getLink}>获取DOM</button>
    </div>
  );

}

export default App;

// 01、useRef在TS的使用，必须先明确是获取谁的DOM（可将鼠标移入DOM元素上获取其具体类型）
// 02、useRef初始值通常为null，因为useRef的泛型在定义时是联合类型，即具体元素的类型与null类型的联合
// 03、useRef返回的对象是不随组件渲染而变，但是它的current属性才是能够变化的，因此赋值必须是给current属性赋值
// 04、在TS环境中使用useRef取DOM时，应该尽量使用可选链操作符避免取值报错 


// useRef取DOM流程
// st1、将鼠标移入DOM元素上获取其具体类型，如input对应的具体类型为 HTMLInputElement
// st2、将获取的具体类型传入useRef的泛型'<>'中
// st3、将useRef返回的对象设置给DOM标签的ref属性
// st4、后续可以通过 useRef返回的对象的current属性取相关的值（建议使用使用可选链操作符避免一开始取null报错）

// JS中的可选链操作符'?.' 
// 01、当可选链操作符前的数据是undefined或者null时，不会往后取值导致报错
// 02、可选链操作符的作用等同于 xxx&&xxx.attr 或者 if(xxx){ xxx.attr }
// 03、可选链操作符可以在属性或者方法中使用，例如 xxx.fn?.() 等同于 xxx&&xxx.fn() 或者 if(xxx){ xxx.fn() }
// 04、可选链操作符是JS的内容，因此可以在JS与TS中使用

// TS中的非空断言'!'
// 01、非空断言'!'是TS的内容，只能在TS中使用，无法在JS中使用
// 02、只有明确非空断言操作符前的内容不为空，才能正确使用非空断言，如 xxx!.aa 则表示xxx一定不为空
// 03、TS中的非空断言'!'与类型断言（'<Xxx>'或者 as Xxx）是不同的概念，不要搞混（此处Xxx是TS中的具体类型）
// 04、不要在纯JS中使用非空断言（因为非空断言是TS中才能使用的操作符）
// 05、能用非空断言的地方一般情况下也能够使用可选链操作符，应该根据实际情况正确使用


// TS非空断言与TS类型断言
// 非空断言
// 01、当明确某个对象属性不可空时，可以直接对其进行断言，以便减少不必要的操作
// 02、TS非空断言用于断言TS对象的属性不为空
// --、例如：obj.xxx! 表示断言obj.xxx不为空
// --、例如：obj.xxx!.aaa 表示断言obj.xxx不为空，可以点出后续的aaa
// 类型断言
// 01、当TS类型推断出的类型比较宽泛时，自己知道的类型比TS推断出的更加具体时可以断言其类型
// 02、TS类型断言用于断言TS的类型，通常用于断言DOM元素的类型
// 03、TS类型断言有两种写法（'<XXX>' 与 'as XXX'，其中此处xxx是更为具体的类型）
{/* <HTMLInputElement>aaa 或者 aaa as HTMLInputElement 表示断言aaa的类型是HTMLInputElement */ }
