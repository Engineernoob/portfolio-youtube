import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-16 flex flex-col lg:flex-row">
        <main className="flex-1">
          <VideoGrid />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}
