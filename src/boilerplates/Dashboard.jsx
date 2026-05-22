
import Image from 'next/image';
import { Button } from '@heroui/react';

import Link from 'next/link';
import EnrollmentCard from '@/components/EnrollmentCard';

export default async function Dashboard() {


    return (
        <div></div>
    );
}


const NotFound = () => {
    return (
        <div className="p-12 text-center bg-slate-50 border rounded-2xl">
            <p className="mb-4">No courses yet</p>

            <Link href="/courses">
                <Button>Browse Courses</Button>
            </Link>
        </div>
    );
}