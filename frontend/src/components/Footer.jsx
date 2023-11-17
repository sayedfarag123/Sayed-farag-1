import React from 'react'

const Footer = () => {
    return (

        <footer className="bg-white p-4 rounded-b-lg shadow dark:bg-gray-900 pt-16 ">
            
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400"> Made by<a href="https://www.facebook.com/profile.php?id=100010796496004" className="hover:underline"> Ali Ahmed</a>. All Rights Reserved © {Date().slice(11,15)}.</span>
        </footer>



    )
}

export default Footer