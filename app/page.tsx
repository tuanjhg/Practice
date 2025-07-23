import Image from "next/image"
import Button from "./Components/Button"
import Button2 from "./Components/Button2"
import Container from "./Components/Container"
import Form from "./Components/Form"
import Container2  from "./Components/Container2"
import content from "./Components/Content"

const features = content.features;
const howItWorkText = content.howItWorkText;

export default function Home() {
  return (
    <div className="font-mono grid grid-rows-[20px] min-h-screen p-8 pb-20 gap-[50px] sm:p-20">
      <header className="sticky top-0 bg-white/80 z-10 w-full border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center p-4">
          <a href="#" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="logo" className="rounded-md" />
            <p className="text-xl font-bold text-blue-600">AlPow</p>
          </a>
          <nav className="hidden md:flex items-center gap-[60px] text-gray-700">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">News</a>
            <a href="#" className="hover:text-blue-600 transition-colors">FAQ</a>
          </nav>
          <div>
            <Button>Contact Us</Button>
          </div>
        </div>
      </header>
      <main>
        <section className="bg-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI - Powerd LMS
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Close knowleadge gaps faster with the  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">AI-Powered</span>
          </p>
           <div className="flex flex-row justify-center gap-[20px]">
            <Button>Demo</Button>
            <Button2>How It Works</Button2>
          </div>
        </section>
        <section id="features" className="py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl  font-bold text-gray-900 mb-4">
                  Will you have 
              </h1>
              
            <h2 className="text-3xl  font-mono text-gray-900">"Not Just Watching, But Truly Learning"</h2>
            <p className="text-md text-gray-600 mt-4">Tools designed to help you understand deeply and remember for the long term.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[15px]">
            {features.map((feature) => (
              <Container
                key={feature.title}
                image={<img src={feature.imageSrc} alt={feature.title} className="mx-auto mb-4 w-16 h-16 rounded-full" />}
                title={feature.title}
                bodytext={feature.bodytext}
              />
            ))}
          </div>
          </section>
      <section id="how-it-works" className="py-20 text-center bg-gray-50 rounded-lg">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  How It Works 
              </h1>
  <h2 className="text-3xl md:text-4xl font-mono text-gray-900 mb-12">
    Works in Just 3 Simple Steps
  </h2>
  <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-[25px] md:gap-[50px]">
     {howItWorkText.map((howItWork) => (
              <Container2
                key={howItWork.idx}
                idx={howItWork.idx}
                title={howItWork.title}
                bodytext={howItWork.bodytext}
              />
            ))}
  </div>
</section>
<div className = "flex flex-col justify-center">

        <Image 
        src="/image.png"
        alt="image demo"
        width={2000}
        height={50}
        />
        <Button>Get Demo</Button>
</div>
        <section id="pricing" className="py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Pricing</h2>
           <div className="flex justify-center gap-[20px]">
        {["Monthly", "Yearly", "Link"].map((tab) => (
          <button key={tab} className="px-4 py-2 border rounded hover:bg-gray-100">
            {tab}
          </button>
        ))}
      </div>
          <div className="grid  md:grid-cols-2 gap-[15px] max-w-5xl mx-auto">
  <div className="p-8 rounded-lg shadow-lg border border-gray-200 bg-white flex flex-col">
    <h3 className="text-2xl font-bold mb-2">Personal</h3>
    <p className="text-4xl font-bold mb-4">?<span className="text-lg font-mono text-gray-500">/month</span></p>
    <ul className="mb-6 space-y-2 text-gray-600 flex-grow">
      <li>✓ 20 courses/month</li>
      <li>✓ AI Q&A</li>
      <li>✓ Project suggestions</li>
    </ul>
    <Button>Start Now</Button>
  </div>
  <div className="p-8 rounded-lg shadow-xl border-2 border-blue-600 bg-gray-900 text-white relative flex flex-col">
    <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
    <h3 className="text-2xl font-bold mb-2">Professional</h3>
    <p className="text-4xl font-bold mb-4">?<span className="text-lg font-mono text-gray-400">/month</span></p>
    <ul className="mb-6 space-y-2 text-gray-300 flex-grow">
      <li>✓ Unlimited courses</li>
      <li>✓ Advanced AI Q&A</li>
      <li>✓ Detailed project suggestions</li>
      <li>✓ Spaced repetition review</li>
    </ul>
    <Button2>Start Now</Button2>
  </div>
          </div>
          </section>
    <section  className="py-20 text-center bg-gray-50 rounded-lg">
            <h2 className="text-3xl  font-mono text-gray-900 mb-4">
  Ready to accelerate your learning?
</h2>
<p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
  Leave your contact information.
</p>
            <div className="max-w-xl mx-auto">
              <Form />
            </div>
        </section>
      </main>
<footer className="border-t mt-20">
        <div className="container mx-auto p-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <img src="/logo.jpg" alt="logo" className="rounded-md"/>
                <p className="font-bold text-blue-600">AlPow</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-blue-600">Github</a>
                <a href="#" className="text-gray-500 hover:text-blue-600">Facebook</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
