'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { AiOutlineDashboard } from 'react-icons/ai';
import { IoCalendarOutline } from 'react-icons/io5';
import { LiaBookSolid, LiaCogSolid } from 'react-icons/lia';
import { FaInbox, FaRegCircleUser } from 'react-icons/fa6';

export default function KambazNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to /Account as default
  useEffect(() => {
    if (pathname === '/') {
      router.replace('/Account');
    }
  }, [pathname, router]);

  const navItems = [
    {
      href: '/Account/Profile',
      label: 'Account',
      icon: FaRegCircleUser,
      id: 'wd-account-link',
      isAccount: true,
    },
    {
      href: '/Dashboard',
      label: 'Dashboard',
      icon: AiOutlineDashboard,
      id: 'wd-dashboard-link',
    },
    {
      href: '/Dashboard2',
      label: 'Courses',
      icon: LiaBookSolid,
      id: 'wd-courses-link',
    },
    {
      href: '/Calender',
      label: 'Calendar',
      icon: IoCalendarOutline,
      id: 'wd-calendar-link',
    },
    {
      href: '/Inbox',
      label: 'Inbox',
      icon: FaInbox,
      id: 'wd-inbox-link',
    },
    {
      href: '/Labs',
      label: 'Labs',
      icon: LiaCogSolid,
      id: 'wd-labs-link',
    },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      {/* NEU Logo */}
      <ListGroupItem className="bg-black border-0 text-center" as="a" target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      {/* Sidebar Navigation Items */}
      {navItems.map(({ href, label, icon: Icon, id, isAccount }) => {
        const isActive = pathname === href;

        const itemBackground = isActive ? 'bg-white' : 'bg-black';
        const textColor = isActive ? 'text-danger' : isAccount ? 'text-white' : 'text-white';
        const iconColor = isActive
          ? 'text-danger'
          : isAccount
          ? 'text-white'
          : 'text-danger';

        return (
          <ListGroupItem
            key={href}
            className={`border-0 text-center ${itemBackground}`}
            style={{ height: '100px' }}
          >
            <Link
              href={href}
              id={id}
              className={`d-block text-decoration-none ${textColor}`}
            >
              <Icon className={`fs-1 ${iconColor}`} />
              <div
                className={`fw-normal ${textColor}`}
                style={{ fontSize: '0.75rem' }}
              >
                {label}
              </div>
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
