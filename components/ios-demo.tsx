import { Iphone15Pro } from "@/components/ios";

export function IOSDemo() {
  return (
    <div className="flex items-center justify-center">
      <Iphone15Pro />
    </div>
  );
}

export function IOSDemoWithCustomContent() {
  return (
    <div className="relative">
      <Iphone15Pro />
    </div>
  );
}


 {/* Dynamic Island
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div> */}


            //   {/* Screen Content */}
            //   <div className="pt-16 p-6 h-full flex flex-col">
            //     <div className="text-white text-center mb-6">
            //       <h4 className="text-sm font-semibold">Social Media</h4>
            //       <p className="text-xs text-gray-400">Connect</p>
            //     </div>

            //     {/* Social Media Icons Grid */}
            //     <div className="grid grid-cols-2 gap-4 flex-1 content-center">
            //       {socialApps.map(({ icon: Icon, color, name }) => (
            //         <motion.button
            //           key={name}
            //           whileHover={{ scale: 1.05 }}
            //           whileTap={{ scale: 0.95 }}
            //           className={`${color} rounded-2xl p-4 flex items-center justify-center aspect-square shadow-lg`}
            //           onClick={() => console.log(`Clicked ${name}`)}
            //         >
            //           <Icon className="w-8 h-8 text-white" />
            //         </motion.button>
            //       ))}
            //     </div>
            //   </div>