import {motion, spring} from "motion/react"

export const Testimonials = () => {
    return (
        <div className="w-[70vw] max-w-[80vw] pb-25 flex flex-col" id="testimonials">
  <motion.div className="w-full" initial={{opacity:0 , y:100}} whileInView={{opacity:1,y:0}} transition={{duration:1,type:spring}}>
    <div className="pb-20 w-full " id="testimonials">
      <h3 className="text-black font-bold text-4xl">What Users Say</h3>
      <h3 className="text-[#999999] font-medium text-3xl">User testimonials will go here.</h3>
    </div>
  </motion.div>

  <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" initial={{opacity:0 , y:100}} whileInView={{opacity:1,y:0}} transition={{duration:1,type:spring,delay:0.3}} >
    <div className="bg-[#f5f5f5] p-10 h-[50vh] rounded-lg">
      <p className="text-[#777777] text-[15px] h-[90%] text-start">"This app has changed the way I trade!"</p>
      <p className="text-[#000000] font-semibold text-[15px] text-start">- User 1</p>
    </div>
    <div className="bg-[#f5f5f5] p-10 h-[50vh] rounded-lg">
      <p className="text-[#777777] text-[15px] h-[90%] text-start">"I love the user-friendly interface."</p>
      <p className="text-[#000000] text-[15px] text-start font-semibold">- User 2</p>
    </div>
    <div className="bg-[#f5f5f5] p-10 h-[50vh] rounded-lg">
      <p className="text-[#777777] text-[15px] h-[90%] text-start">"The customer support is fantastic!"</p>
      <p className="text-[#000000] text-[15px] text-start font-semibold">- User 3</p>
    </div>
  </motion.div>
</div>

    )
}