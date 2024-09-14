import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const links = [
    { path: '/update-profile', label: 'Update your profile' },
    { path: '/update-password', label: 'Update your password' },
    { path: '/profile-photo-upload', label: 'Upload profile photo' },
]

function MyMenu() {
    const users = useSelector(store => store?.users);
    const {userAuth} = users;
    return (
        <Menu as="div" className="ml-3 relative z-10">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src={userAuth?.profilePhoto}
                                alt=""
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            {links.map(link => (
                                <Menu.Item key={link.label}>
                                    {({ active }) => (
                                        <Link
                                            to={link.path}
                                            className={`${
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-black"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default MyMenu;