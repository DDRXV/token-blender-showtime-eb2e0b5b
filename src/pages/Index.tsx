
import TokenBlender from "@/components/TokenBlender";
import { Logo } from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-dyyota-white">
      <div className="container mx-auto px-4 flex flex-col justify-center min-h-screen py-6">
        <div className="flex flex-col items-center">
          <Logo className="mb-4" />
          <TokenBlender />
        </div>
      </div>
    </div>
  );
};

export default Index;
