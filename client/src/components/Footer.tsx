import { Link } from 'react-router-dom'
import qrcode from '../assets/githubocece77.png'

const Footer: React.FC =()=>{
  return(
    <>

    <div className='absolute left-0 right-0 grid grid-cols-2 px-10 py-4 bg-blue-950'>

         <div>
            <p className='text-white font-extrabold'>Navigation</p>
            <ul className='font-thin text-fluo flex gap-6 pt-2'>
              <li className='rounded border border-fluo  px-2 py-1 hover:bg-fluo hover:text-blue-900 transition-all'><Link to="/">Homepage</Link></li>
              <li className='rounded border border-fluo  px-2 py-1 hover:bg-fluo hover:text-blue-900 transition-all'><Link to="/login ">Login</Link></li>
              <li className='rounded border border-fluo  px-2 py-1 hover:bg-fluo hover:text-blue-900 transition-all'><Link to="/sign">Sign up</Link></li>
            </ul>
          </div>

          <div className='flex flex-col items-end  justify-center gap-2'>
            <div className='flex justify-center items-center flex-col gap-2'>
             <img src={qrcode} alt="qrcode" className='w-20'/>
             <Link to="https://github.com/Ocece77" className='font-bold bg-fluo rounded-lg px-2 hover:bg-blue-900 hover:text-fluo transition-all'>My Github</Link>
            </div>

          </div>

      </div>


    </>
  )
}

export default Footer