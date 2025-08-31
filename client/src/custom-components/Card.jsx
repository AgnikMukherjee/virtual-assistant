import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext';

const Card = ({image}) => {
    const {frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage} = useContext(userDataContext)

    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

    // Adjust the threshold value to control the tilt effect
    const threshold = 12;

    const handleMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTilt({ x: y * -threshold, y: x * threshold });
    };

    return (
        <div className={`rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] bg-primary/20 hover:border-secondary hover:border-2 ${selectedImage === image ? 'border-secondary border-2' : ''}`}
            onMouseMove={handleMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}

            onClick={()=>setSelectedImage(image)}
        >
            <img src={image} className="w-full h-full object-cover"
            />
        </div>

    );
};

export default Card