import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css'

import './App.css'
import Basic from './example/Basic'
import basicRaw from './example/Basic?raw'
import Advanced from './example/Advanced'
import advancedRaw from './example/Advanced?raw'

const App = () => (
  <>
    <h3>Example avec React</h3>

    <article>
      <h4>Basic</h4>
      <div className='row'>
        <div className='code'>
          <pre
            dangerouslySetInnerHTML={{
              __html: hljs.highlight('tsx', basicRaw).value,
            }}
          />
        </div>
        <Basic />
      </div>
    </article>

    <article>
      <h4>Advanced</h4>
      <div className='row'>
        <div className='code'>
          <pre
            dangerouslySetInnerHTML={{
              __html: hljs.highlight('tsx', advancedRaw).value,
            }}
          />
        </div>
        <Advanced />
      </div>
    </article>
  </>
)

export default App
