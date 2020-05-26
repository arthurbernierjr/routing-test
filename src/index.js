import { Komponent , render} from '../../../code/kofujs'
import {kofuRouter} from '../../../code/kofujs'
import Router from 'vanilla-router'

const styles = {
  mainPageHeading: {
    backgroundColor: 'red'
  }
}

class Example extends Komponent{
  constructor (props)  {
    super (props)

    this.classes = this.setStyles(styles).classes
  }

  komponentDidMount () {
    console.log('Hello world')
  }

  present () {
    return (
        <h1 className={`${this.classes.mainPageHeading}`}> Hello World <Link to="/other">other</Link></h1>
    )
  }
}

class Other extends Komponent{
  constructor (props)  {
    super (props)
    this.classes = this.setStyles(styles).classes
  }

  komponentDidMount () {
    console.log('Hello world')
  }
  present () {
    return (
        <h1 className={`${this.classes.mainPageHeading} other`}> Hello World <Link to="/">home</Link></h1>
    )
  }
}

class Link extends Komponent {
  constructor(props){
    super(props)
    this.state = {}
    this.handleNavigation = this.handleNavigation.bind(this)
  }
  handleNavigation(event, to){
    event.preventDefault()
    console.log(to)
    history.pushState({},to, to)
    router.check()
  }

  present(){
    return (<a href={this.props.to} onClick={(event)=> {
      this.handleNavigation(event, this.props.to)
    }}>
      {this.props.children}
      </a>)
  }
}
// // let currentVnode = null
// // const router = new Router({
// //   mode: 'history',
// //   page404: function (path){
// //     if (currentVnode === null){
// //     currentVnode = render(<h2>{`No page found at ${path}`}<Link to={'/'}> Back home</Link></h2>, document.getElementById('app'))
// //   } else {
// //     currentVnode = render(<h2>{`No page found at ${path}`} <Link to={'/'}> Back home</Link></h2>, currentVnode)
// //   }
// //   }
// // })
// // const routes = {
// // '/': Example,
// // '/other': Other
// // }
// // router.add('',()=>{
// //   const View = routes['/']
// //   if (currentVnode === null){
// //   currentVnode = render(<View />, document.getElementById('app'))
// // } else {
// //   currentVnode = render(<View />, currentVnode)
// // }
// // })
// // router.add('other', ()=> {
// //   const View = routes['/other']
// //   if (currentVnode === null){
// //   currentVnode = render(<View />, document.getElementById('app'))
// // } else {
// //   currentVnode = render(<View />, currentVnode)
// // }
// // })

const view = { lastView: null}
const router = kofuRouter({
  routes: {
    '/': Example,
    '/other': Other
  },
  rootElementID: 'app',
  view,
  handle404: (path, lastView)=> {
  if(view.lastView === null){
    view.lastView = render(<h2>{`Page not found ${path}`} <Link to={'/'}>Back Home</Link></h2>, document.getElementById('app'))
  } else {
    view.lastView = render(<h2>{`Page not found ${path}`} <Link to={'/'}>Back Home</Link></h2>, view.lastView)
  }
}})
router.addUriListener()
router.check()


/*
// how i want to call it
let lastView = null
const router = KofuRouter({
  routes: {
    '/': Home,
    '/about': About,
    '/contact-us': ContactUs
  },
  rootElementID: 'app',
  handle404: ()=>{console.log('Custom Error View handler Function')}
})
router.addUriListener()
router.check()
*/

/*
// what it needs to do behind the scenes
function KofuRouter ({routes, rootElementID, handle404, store}){
const router = new Router({
  mode: 'history',
  page404: function (path) {
    if(handle404){
    handle404(path, lastView)
  }else {
  if (lastView === null){
  lastView = render(<h2>{`No page found at ${path}`}<Link to={'/'}> Back home</Link></h2>, document.getElementById(rootElementID))
} else {
  lastView = render(<h2>{`No page found at ${path}`} <Link to={'/'}> Back home</Link></h2>, lastView)
}
}
},
store: new Store({initialState})
})
for(let route in routes ){
 let path = route.split('/')
 route.shift()
 path = route.join('/')
 router.add(path, ()=> {
 const View = routes[route]
 if (currentVnode === null){
 currentVnode = render(<View store={store}/>, document.getElementById(rootElementID))
} else {
 currentVnode = render(<View store={store}/>, currentVnode)
}
})
}
return router
}
*/


/*
state: {

}

mutations: {
  actually updates the state
}

getters: {

}

actions : {
  list of events
  i.e.
  updatedThing : () => {
  this.mutations['whatever']
  this.mutations['somethingElse']
  emit('updatedThingEvent')
}
}
components subscribe to something in state , if it changes the component will re-present

*/
