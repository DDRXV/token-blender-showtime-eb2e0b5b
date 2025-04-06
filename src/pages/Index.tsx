
import TokenBlender from "@/components/TokenBlender";
import { Logo } from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-dyyota-white">
      <div className="container mx-auto px-4 pt-4">
        <div className="flex flex-col items-center">
          <Logo className="h-12 mb-2" />
          <TokenBlender />
        </div>
      </div>
    </div>
  );
};

export default Index;
