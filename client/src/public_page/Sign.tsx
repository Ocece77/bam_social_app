import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchStart, signFailed, signSuccess } from "../redux/userSlice"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Link } from "react-router-dom"


const Sign : React.FC=()=>{

  const state = useSelector((state : RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
   interface formulaireObj{
    email? : string,
    username?:string,
    password? :string,
    confirmedpassword?:string

   }

   const [form , setForm] = useState<formulaireObj>()
  
   const trackChange = (e :  React.ChangeEvent<HTMLInputElement>) =>  {
      setForm({...form , [e.currentTarget.id] : e.currentTarget.value})
   }

   const createUser = async (e :React.FormEvent<HTMLFormElement>| HTMLFormElement ) => {
       e.preventDefault()
       if (!form?.email || !form.username ||!form?.password || !form?.confirmedpassword){
        console.error("all the field must be completed")
        return;
       }
       if (form?.confirmedpassword != form?.password){
        console.error("The two password doesn't match")
        return;
       } else{
        delete form.confirmedpassword
       }

       try{
        dispatch(fetchStart())
        const res = await fetch("/api/user/sign",{
          method : "POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(form)
        })
        if(!res.ok){
          dispatch(signFailed())
          console.log("the account couldn't be created")
        } else{
          const data = await res.json()
          dispatch(signSuccess())

          navigate("/login")
          console.log(data)
        }

       } catch(e){
        console.error(e)
       }

   }

  return(
    <>
     <div className="py-16 h-full">
        <form onSubmit={createUser} className="text-white px-28 lg:px-96 ">
          
          <p className="text-3xl font-bold ">Sign<span className="text-fluo">up</span></p>
          <p>You already have an account, login <Link to="/login" className="underline text-fluo hover:text-lime-800">here</Link></p>


          <div className="flex flex-col gap-5 pt-4">

            <div className="flex flex-col gap-2  text-sm">
                  <label htmlFor="email">Enter your email : </label>
                  <input minLength={4} onChange={trackChange} type="email" name="email" id="email" required className="p-1 bg-transparent border border-fluo rounded"/>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                  <label htmlFor="email">Enter your username : </label>
                  <input minLength={4} onChange={trackChange} type="text" name="username" id="username" required className="p-1 bg-transparent border border-fluo rounded"/>
                </div>
                                
              <div className="flex flex-col gap-2 text-sm">
                  <label htmlFor="email">Enter your password : </label>
                  <input minLength={6} onChange={trackChange} type="password" name="password" id="password" required className="p-1 bg-transparent border border-fluo rounded"/>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                  <label htmlFor="email">Confirm the password : </label>
                  <input minLength={6} onChange={trackChange} type="password" name="confirmedpassword" id="confirmedpassword"required  className="p-1 bg-transparent border border-fluo rounded"/>
                </div>



                <div className="flex flex-col gap-2">
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
                   {!state.loading && <span>sign up</span>}
                    </button>
                    
                    {state.error &&  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="block font-bold">Something went wrong</strong>
                    <span className="block sm:inline"> The account already exist or they're a error with the server</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    </span>
                  </div>}

                </div>
          </div>
          


        </form>
     </div>
    </>
  )
}

export default Sign