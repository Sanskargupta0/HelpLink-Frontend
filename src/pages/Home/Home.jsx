import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Star,
  LightbulbIcon,
  Rocket,
  Users,
  ChevronLeft,
  Zap,
} from "lucide-react"




const CategorySlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsPerPage = 4
  const categories = [
    { id: 1, name: "Technology", image: "/placeholder.svg?height=100&width=100", count: 245 },
    { id: 2, name: "Health & Wellness", image: "/placeholder.svg?height=100&width=100", count: 183 },
    { id: 3, name: "Education", image: "/placeholder.svg?height=100&width=100", count: 167 },
    { id: 4, name: "Environment", image: "/placeholder.svg?height=100&width=100", count: 142 },
    { id: 5, name: "Arts & Culture", image: "/placeholder.svg?height=100&width=100", count: 198 },
    { id: 6, name: "Food & Craft", image: "/placeholder.svg?height=100&width=100", count: 112 },
    { id: 7, name: "Games", image: "/placeholder.svg?height=100&width=100", count: 156 },
    { id: 8, name: "Fashion", image: "/placeholder.svg?height=100&width=100", count: 89 },
  ]
  const totalPages = Math.ceil(categories.length / itemsPerPage)

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % totalPages)
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages)

  return (
    <div className="relative">
      <div className="overflow-hidden px-4">
        <motion.div
          className="flex gap-6 justify-center"
          initial={{ opacity: 1 }}
          animate={{ x: `calc(-${activeIndex * 100}%)` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {categories.map((category) => (
            <a
              href="#"
              key={category.id}
              className="min-w-[250px] max-w-[250px] bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-800"
            >
              <div className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center">
                  <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} projects</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${
              activeIndex === index
                ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
                : "w-2 bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Project Creator",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "Fund helped me bring my sustainable fashion line to life. The platform is intuitive, and the support team was there every step of the way. I exceeded my funding goal by 150%!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Backer",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "I've backed over 20 projects on Fund, and it's always a seamless experience. The updates from creators keep me engaged, and I love being part of bringing innovative ideas to life.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Project Creator",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "As a first-time creator, I was nervous about launching my project. Fund's resources and community made it possible. My educational game is now in production thanks to 300+ backers!",
      rating: 4,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Backer",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "The quality of projects on Fund is consistently high. I appreciate the vetting process and how transparent creators are required to be. It builds trust in the platform.",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <motion.AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 1000 : -1000 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 md:p-10 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="rounded-full h-20 w-20 object-cover border-4 border-purple-100 dark:border-purple-900"
                />
              </div>
              <div className="flex-1">
                <div className="flex mb-2">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gray-300 dark:text-gray-700" />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{testimonials[currentIndex].content}"</p>
                <div>
                  <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.AnimatePresence>
      </div>

      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-5 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-5 h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index
                ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
                : "w-2 bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}



const FloatingIcons = () => {
  const icons = [
    {
      id: 1,
      icon: <Heart className="h-6 w-6 text-pink-500" />,
      x: "10%",
      y: "20%",
      delay: 0,
    },
    {
      id: 2,
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      x: "85%",
      y: "15%",
      delay: 0.5,
    },
    {
      id: 3,
      icon: <LightbulbIcon className="h-7 w-7 text-purple-500" />,
      x: "75%",
      y: "65%",
      delay: 1,
    },
    {
      id: 4,
      icon: <Rocket className="h-8 w-8 text-blue-500" />,
      x: "15%",
      y: "70%",
      delay: 1.5,
    },
    {
      id: 5,
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      x: "50%",
      y: "85%",
      delay: 2,
    },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, -20, -40],
            x: [0, 10, 0, -10],
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-3 rounded-full">{item.icon}</div>
        </motion.div>
      ))}
    </div>
  )
}

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-20 md:py-32">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400">
                Fund projects that matter to you.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of innovators and creators bringing their ideas to life through community-powered
                funding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-all hover:scale-105 text-lg px-8 py-6 h-auto rounded-full">
                  Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="text-lg px-8 py-6 h-auto rounded-full">
                  Start a Project
                </button>
              </div>
            </div>
          </div>
          <FloatingIcons />
        </section>


        {/* How It Works Section */}
        <HowItWorks />

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Explore Categories</h2>
            <CategorySlider />
          </div>
        </section>

        

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What Our Community Says</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Join thousands of creators and backers who've found success on our platform
            </p>
            <TestimonialCarousel />
          </div>
        </section>

        {/* Newsletter Section
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 p-8 md:p-12">
              <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.5))]"></div>
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stay in the loop</h2>
                <p className="text-white/90 mb-8">
                  Get updates on new projects, success stories, and exclusive funding opportunities
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/20 text-white placeholder:text-white/70 border-0 focus-visible:ring-2 focus-visible:ring-white"
                  />
                  <button className="bg-white text-purple-600 hover:bg-white/90">Subscribe</button>
                </div>
                <p className="text-white/70 text-sm mt-4">We respect your privacy. Uns </p>
                <p className="text-white/70 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
              </div>
              </div>
          </div>
        </section> */}
        <NewsletterSection />
      </main>
    </div>
  )
}

export default Home





const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create Your Project",
      description: "Set up your project page with compelling details, images, and funding goals.",
      icon: <LightbulbIcon className="h-8 w-8 text-purple-600" />,
    },
    {
      id: 2,
      title: "Share With Community",
      description: "Spread the word and engage with potential backers through updates and comments.",
      icon: <Users className="h-8 w-8 text-pink-600" />,
    },
    {
      id: 3,
      title: "Get Funded & Launch",
      description: "Receive funds when you reach your goal and bring your project to life.",
      icon: <Rocket className="h-8 w-8 text-blue-600" />,
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fund makes it easy to bring your creative projects to life. Here's how to get started.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="relative"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow h-full">
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const NewsletterSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated!</h2>
          <p className="mb-6">Subscribe to our newsletter for the latest projects and funding tips.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="px-4 py-3 rounded-md bg-white text-gray-800 border-0" />
            <button className="bg-white text-purple-600 px-4 py-3 rounded-md hover:bg-gray-200 transition-all">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  )
}



