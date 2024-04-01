import React from 'react'
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import profileLogo from '../assets/profile.jpg'
import { IoMdHome } from "react-icons/io";

const SideBar = () => {
    return (
        <div className=''>
            <Sidebar aria-label="Sidebar with content separator example">
                <Sidebar.Logo href="#" img={profileLogo} className='rounded' imgAlt="Flowbite logo">
                    Flowbite
                </Sidebar.Logo>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin/dashboard/uploadBooks" icon={HiOutlineUpload}>
                            Upload Books
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin/dashboard/manageBooks" icon={HiInbox}>
                            Manage Books
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiUser}>
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiShoppingBag}>
                            Products
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiArrowSmRight}>
                            Sign In
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiTable}>
                            Sign Up
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/" icon={IoMdHome}>
                            Home
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiViewBoards}>
                            Documentation
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BiBuoy}>
                            Help
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default SideBar