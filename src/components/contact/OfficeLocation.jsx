function OfficeLocation() {
    return (
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
  
            <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600">
              Our Location
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Visit Our Office
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              We'd be happy to meet you in person. Whether you're a university,
              recruiter, or student, our team is always ready to collaborate.
            </p>
  
          </div>
  
          <div className="grid gap-10 lg:grid-cols-2">
  
            {/* Left Information */}
  
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg">
  
              <div className="space-y-8">
  
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    📍 Address
                  </h3>
  
                  <p className="mt-3 leading-relaxed text-neutral-600">
                    CampusTE Headquarters
                    <br />
                    Chennai,
                    <br />
                    Tamil Nadu,
                    <br />
                    India
                  </p>
                </div>
  
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    🕒 Working Hours
                  </h3>
  
                  <p className="mt-3 text-neutral-600">
                    Monday – Friday
                    <br />
                    9:00 AM – 6:00 PM IST
                  </p>
                </div>
  
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    📞 Customer Support
                  </h3>
  
                  <p className="mt-3 text-neutral-600">
                    +91 XXXXX XXXXX
                    <br />
                    support@campuste.ai
                  </p>
                </div>
  
              </div>
  
            </div>
  
            {/* Map Placeholder */}
  
            <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-blue-300 bg-gradient-to-br from-blue-50 via-white to-purple-50">
  
              <div className="text-center">
  
                <div className="text-7xl">
                  🗺️
                </div>
  
                <h3 className="mt-6 text-2xl font-bold text-neutral-900">
                  Interactive Map
                </h3>
  
                <p className="mx-auto mt-4 max-w-sm leading-relaxed text-neutral-600">
                  Google Maps integration will be added during the backend and API
                  integration phase.
                </p>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default OfficeLocation;