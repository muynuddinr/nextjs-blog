import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0" />
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-extrabold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Thoughts, Stories & Ideas
              </span>
            </h1>
            <p className="text-gray-300 text-xl mb-8 leading-relaxed">
              Join me on a journey through technology, design, and innovation. 
              Discover insights that inspire and knowledge that empowers.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/blog" 
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:opacity-90 transition-all duration-300"
              >
                Read Blog
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-3 bg-gray-800 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-4 border-purple-500 pb-2">Latest Posts</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Post Cards */}
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
            >
              <div className="aspect-video bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex gap-3 mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full">
                    {['Tech', 'Design', 'Development'][index]}
                  </span>
                  <span className="px-3 py-1 bg-gray-800 text-gray-400 text-sm rounded-full">
                    5 min read
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {[
                    'Building Modern Web Applications',
                    'The Future of AI in Development',
                    'Mastering Design Systems'
                  ][index]}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-3">
                  {[
                    'Explore the latest techniques and best practices for creating robust and scalable web applications...',
                    'Discover how artificial intelligence is reshaping the landscape of software development...',
                    'Learn how to create and maintain effective design systems that scale...'
                  ][index]}
                </p>
                <Link 
                  href={`/blog/post-${index + 1}`}
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Read More 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-4 border-purple-500 pb-2">Featured Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((_, index) => (
            <div 
              key={index}
              className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-purple-400">
                    {['AI-Powered Analytics Dashboard', 'E-commerce Platform'][index]}
                  </h3>
                  <p className="text-gray-400">
                    {[
                      'A real-time analytics platform built with Next.js and TensorFlow',
                      'Modern e-commerce solution with headless CMS integration'
                    ][index]}
                  </p>
                </div>
                <span className="px-4 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full">
                  {['Featured', 'New'][index]}
                </span>
              </div>
              <div className="flex gap-3 mb-6">
                {[
                  ['React', 'TypeScript', 'AI/ML'],
                  ['Next.js', 'GraphQL', 'Stripe']
                ][index].map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 text-gray-400 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <Link 
                href={`/projects/${index + 1}`}
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                View Project
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Technologies Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-4 border-purple-500 pb-2">Skills & Technologies</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'Frontend', skills: ['React', 'Next.js', 'TypeScript'] },
            { name: 'Backend', skills: ['Node.js', 'Python', 'GraphQL'] },
            { name: 'DevOps', skills: ['Docker', 'AWS', 'CI/CD'] },
            { name: 'Design', skills: ['Figma', 'UI/UX', 'Tailwind'] }
          ].map((category, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-purple-400">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-gray-800 text-gray-400 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-4 border-purple-500 pb-2">What People Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300"
            >
              <svg className="w-10 h-10 text-purple-500 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-300 mb-6 italic">
                {[
                  "Incredible attention to detail and technical expertise. The project exceeded our expectations!",
                  "A true professional who delivers outstanding results. Great communication throughout the process.",
                  "Innovative solutions and cutting-edge technology implementation. Highly recommended!"
                ][index]}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-purple-400">
                    {['John Smith', 'Sarah Johnson', 'Mike Williams'][index]}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {['CTO, TechCorp', 'Product Manager, StartupX', 'Founder, DevLabs'][index]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-12">
          <div className="absolute inset-0 bg-black/50 rounded-3xl backdrop-blur-sm" />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to get notified about new posts, tutorials, and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-3 bg-black/50 rounded-full border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button 
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:opacity-90 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
