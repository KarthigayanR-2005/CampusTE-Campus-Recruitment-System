function ContactForm() {
    return (
      <section
        id="contact-form"
        className="bg-gradient-to-b from-slate-50 via-white to-blue-50/30 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mb-14 text-center">
  
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Send us a Message
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              We'd Love to Hear From You
            </h2>
  
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>
  
          </div>
  
          {/* Form */}
  
          <form className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl sm:p-10">
  
            <div className="grid gap-6 md:grid-cols-2">
  
              {/* Full Name */}
  
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Full Name
                </label>
  
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
  
              {/* Email */}
  
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Email Address
                </label>
  
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
  
              {/* Phone */}
  
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Phone Number
                </label>
  
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
  
              {/* Organization */}
  
              <div>
                <label
                  htmlFor="organization"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Organization / University
                </label>
  
                <input
                  id="organization"
                  type="text"
                  placeholder="Enter organization"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
  
              {/* Subject */}
  
              <div className="md:col-span-2">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Subject
                </label>
  
                <input
                  id="subject"
                  type="text"
                  placeholder="Enter subject"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
  
              {/* Message */}
  
              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Message
                </label>
  
                <textarea
                  id="message"
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
  
            </div>
  
            {/* Button */}
  
            <div className="mt-8">
  
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Send Message
              </button>
  
            </div>
  
          </form>
  
        </div>
      </section>
    );
  }
  
  export default ContactForm;