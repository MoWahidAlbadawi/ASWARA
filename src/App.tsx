import {Button} from '@/components/ui/button';

const App = () => {
  return (
    <>

    <div className="test-app">
      <h2>I am developer Wahid </h2>
      <p>welcome to jewelry store</p>
      </div>
      <div className='flex flex-col  justify-center items-center'>
        <p>Techs I installed for this projects for now</p>
        <ul className="text-center text-xl gap-2 text-teal-500 ">
          <li>tailwind</li>
          <li>mui</li>
          <li>redux toolkit</li>
          <li>router</li>
          <li>react-hook-form</li>
          <li>tanstack query</li>
          <li>icons</li>
          <li className='mt-12'>toasts</li>
        </ul>
        <Button className='p-12'>Get Started</Button>
      </div>
    </>
  )
}
export default App;