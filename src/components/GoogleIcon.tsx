import Image from "next/image";

const GoogleImage = () => {
    return ( 
        <Image
        src="/google.png"
        alt="google image"
        width={20}
        height={20}
        className="mr-2"
        />
     );
}
 
export default GoogleImage;