"use client";

import Image from "next/image";
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AISidebar = dynamic(() => import('../components/AISidebar'), {
  ssr: false,
});


export default function Home() {
  const [editorContent, setEditorContent] = useState('');

const handleUpdateContent = (content: string) => {
  setEditorContent(content);
};
  return (
    <div className="flex h-screen bg-gray-50">
      <a href="#" className="text-blue-500">hi this is a bunch of other content</a>


      {/* AI Sidebar */}
      <aside className="w-80 border-l border-gray-200 bg-white">
        <AISidebar onUpdateContent={handleUpdateContent} />
      </aside>
    </div>
  );
}
