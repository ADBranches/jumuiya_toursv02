export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="/src/assets/images/bg-pattern.webp"
          alt="Ugandan culture"
          className="rounded-2xl shadow-lg w-full h-80 object-cover"
        />
        <div>
          <h2 className="text-4xl font-bold text-green-700 mb-4">Who We Are</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Jumuiya Tours is a Ugandan-owned company passionate about eco-tourism.
            We partner with local communities to deliver authentic experiences —
            from gorilla trekking to cultural safaris.
          </p>
        </div>
      </div>
    </section>
  );
}
