import { Chip } from '@heroui/react';
import { BookOpen, Clock, BarChart, Users } from 'lucide-react';
import Image from 'next/image';
export default async function TutorDetails(){

    const featuredItems = [
       
    ];  
    return (
        <div></div>

    );
}
const NotFound = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <h2 className="text-2xl font-bold text-red-500">Course not found</h2>
            <p className="text-muted-foreground mt-2">Please log in to view protected course details.</p>
        </div>
    );
}