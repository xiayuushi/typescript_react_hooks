import React from 'react'
import { useLocation } from 'react-router-dom'

// 导入类型声明文件时不要带'.d.ts'的文件后缀名
import { T } from '../../types/index'

const Detail = () => {
  const location1 = useLocation()
  const location2 = useLocation<T>()

  return (
    <div className="detail-container">
      <h1>Detail</h1>
      <div style={{ backgroundColor: '#f2f  ', padding: 10, color: '#fff' }}>
        <h4>（useLocation不传泛型参数会报错对象类型unknown 且 location对象点出属性时没有属性提示）</h4>
        <div>接收到Home传递过来的参数：{location1.state?.aa}</div>
      </div>
      <div style={{ backgroundColor: '#666', padding: 10, color: '#fff' }}>
        <h4>（useLocation传入泛型参数后不会报对象类型错误 且 location对象点出属性时一路都有属性提示）</h4>
        <div>接收到Profile传递过来的参数：{location2.state?.from}</div>
      </div>
    </div>
  )
}

export default Detail

// useLocation的作用
// 01、useLocation用于在接收页，接收传参页使用useHistory传递过来的参数


// useLocation在TS中必须传入泛型参数（而useHistory可以传入也可以不传入泛型参数）
// 无论useLocation是否设置泛型参数都不影响它接收参数，只是TS类型提示是否报错以及是否会有明确的区别而已
// 即，区别在于在点出对象属性时是否会报错对象类型unknown 以及 是否一路都有属性提示
// 01、A 如果useHistory没有传递泛型参数，则useLocation也不传入泛型参数（这点和纯JS中使用一样）
// 01、A 例如 传参页 const history = useHistory(); history.push('/xxx', { aaa:'xxxx' })
// 01、A 例如 接收页 const location = useHistory<>(); location.state.aaa就能够获取传递的参数xxxx
// 01、A 此时 虽然能够使用location对象点出属性接收参数，但是location对象点出属性时可能会报错'对象类型unknow'以及没有明确的属性提示
// 01、A 解决 unknown类型报错，必须将unknown类型的数据进行类型断言或者类型收窄，之后再调用属性或者方法就不会报错TS且有相关属性或者方法提示了
// 02、B 如果useHistory传递了泛型参数且指定了传递参数的类型，则useLocation也应该传入一致的泛型参数
// 02、B 例如 传参页 const history = useHistory<{ aaa: string }>(); history.push('/xxx', { aaa:'xxxx' })
// 02、B 例如 接收页 const location = useHistory<{ aaa: string }>(); location.state.aaa就能够获取传递的参数xxxx


// 通常情况下，如果useHistory与useLocation都传入了泛型，则会将这个泛型参数抽取为独立的文件，使用TS的type或者interface去定义该泛型参数
// 例如：st1、新建通用的类型声明文件 xxx.d.ts
// 例如：st2、文件内定义类型声明并导出：export type T = {aaa: string} | null （考虑到可能为空没有路由参数的情况，因此使用联合类型带上null的情况）
// 例如：st3、在传参页和接收页都导入类型声明文件（导入类型声明文件不要带'.d.ts文件后缀'）： import { T } from 'xxx'
// 例如：st4、传参页useHistory使用该类型声明 const history = useHistory<T>()
// 例如：st4、接收页useLocation使用该类型声明 const location = useLocation<T>()


// N1、导入类型声明文件使用，不要带上'.d.ts'的文件后缀名
// N2、定义泛型类型时，建议抽取为单独的类型声明文件，以便复用
// N3、TS中的interface只能定义对象类型，如果需要定义联合类型的情况只能使用TS类型别名type来定义
// N4、useHistory()返回的对象可以调用push()跳转路由并传参，而useLocation()返回的对象可以通过state属性获取传递的参数
// N5、useHistory()可传也可不传泛型，但是useLocation必须传入泛型参数，且两个hook如果都传入泛型时，泛型参数的key必须保持一致
// N6、unknown类型的数据不能直接使用，必须先经过类型断言构造类型收窄，操作后再使用该数据的属性或者方法时，TS才会有相关属性或者方法提示
// N7、在react-tsx环境中进行类型断言时，应该使用'值 as 类型'的方式，不要使用'<类型> 值'的方式（该方式在tsx环境无效且易与泛型搞混淆）
