import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchStart, loginFailed, loginSuccess } from "../redux/userSlice"


const Login: React.FC =()=>{

  const state = useSelector((state : any) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
   interface formulaireObj{
    email? : string,
    password? :string,
   }

   const [form , setForm] = useState<formulaireObj>()
  
   const trackChange = (e : any) =>  {
      setForm({...form , [e.currentTarget.id] : e.currentTarget.value})

   }

  const login = async (e : any | HTMLFormElement)=>{

    e.preventDefault()
    if (!form?.email ||!form?.password ){
     console.error("all the field must be completed")
     return;
    }

    try{
      dispatch(fetchStart())
      const res = await fetch("/api/user/login" ,{
        method: "POST",
        headers :{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(form)
        }
      )
      if(!res.ok){
        dispatch(loginFailed())
      }else{
        const data = await res.json()
        dispatch(loginSuccess(data))
        navigate("/dashboard?tab=tl")
      }
    } catch(e){
      console.error(e)
    }

  }

  return(
    <>
    <div className="pt-16 h-full ">
        <form onSubmit={login} className="text-white  px-10 md:px-12 lg:w-2/5 mx-auto  ">
          
          <p className="text-3xl font-bold ">Log<span className="text-fluo">in</span></p>


          <div className="flex flex-col gap-5 pt-4">
            <div className="flex flex-col gap-2 text-sm">
                  <label htmlFor="email">Enter your email : </label>
                  <input onChange={trackChange} type="text" name="email" id="email"  className="p-1 bg-transparent border border-fluo rounded"/>
              </div>

                
                <div className="flex flex-col gap-2 text-sm">
                  <label htmlFor="email">Enter your password : </label>
                  <input onChange={trackChange} type="password" name="password" id="password" className="p-1 bg-transparent border border-fluo rounded"/>
                </div>


                <div className="flex flex-col gap-3 ">
                  <button type="submit" className="border border-white text-white font-extrabold px-2 rounded hover:bg-white hover:text-blue-800 p-2 transition duration-200">Log with the example account</button>
                  <button type="submit" className=" bg-blue-900 font-extrabold px-2 rounded hover:bg-white hover:text-blue-800 p-2 transition duration-200">
                      
                      {state.loading && 
                    <div className='flex space-x-1 justify-center items-center  dark:invert'>
                        <span className='sr-only font-pixelify'>Loading...</span>
                        <p className="font-pixelify">loading</p>
                        <div className='h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-1 w-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                       <div className='h-1 w-1 bg-white rounded-full animate-bounce'></div>
                    </div>
                    }
                     {!state.loading && <span>login</span>}
                      </button>
                  <button className="px-4 py-2 border flex gap-2 border-blue-800 rounded-lg text-neutral-100 dark:text-slate-200 justify-center hover:text-blue-800 transition duration-200">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                    <span>Login with Google</span>
                </button>
                </div>

                { state.accCreated && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">The account has been created</strong>
                <span className="block sm:inline"> Connect to access to Bam </span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                </span>
              </div>}

              { state.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Alert !</strong>
                <span className="block sm:inline"> The password or email isnt corrected or the account doesn't exist</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                </span>
              </div>}

           
          </div>
          


        </form>
    </div>

    </>
  )
}

export default Login