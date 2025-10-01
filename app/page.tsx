export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="section text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          Fortivida — <span className="text-blue-600">Strength for Life</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Reset, focus, and grow in just 8 minutes a day. Science-backed rituals,
          real-time triage coaching with <strong>Celeste</strong>, and simple dashboards to track progress.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="#celeste" className="btn-primary">Start Free</a>
          <a href="#pricing" className="btn-secondary">Book a Demo</a>
        </div>
      </section>

      {/* WHAT FORTIVIDA MEANS */}
      <section className="section border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900">What Fortivida means</h2>
        <p className="mt-4 text-gray-700">
          <strong>Fortivida = Forti (Strength) + Vida (Life).</strong> We blend daily science-backed rituals,
          Celeste’s 23/7 triage coaching, and clear dashboards to help you focus, reduce stress, and lead with confidence.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Rituals, not reminders</h3>
            <p className="mt-2 text-gray-700">Practical 8-minute practices that stick.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Real triage</h3>
            <p className="mt-2 text-gray-700">Celeste routes you to the right next step, fast.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Results you can see</h3>
            <p className="mt-2 text-gray-700">Professional dashboards. No fluff, no badges.</p>
          </div>
        </div>
      </section>

      {/* TALK WITH CELESTE (floating widget lives in layout, this is just copy) */}
      <section id="celeste" className="section border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900">Talk with Celeste</h2>
        <p className="mt-4 text-gray-700 max-w-2xl">
          Meet <strong>Celeste</strong>, your always-on triage coach. Ask how to reset, re-focus,
          or handle work stress — she’s available 23/7. You get 5 free messages before signup.
        </p>
      </section>

      {/* PRICING (simple, no nested weirdness) */}
      <section id="pricing" className="section border-t border-gray-200 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Corporate Pricing</h2>
        <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
          Flexible packages for different team sizes. Every plan includes Celeste, rituals, and dashboards.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="celeste-box">
            <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
            <p className="mt-2 text-gray-600">Small teams up to 50 employees</p>
            <p className="mt-4 text-3xl font-extrabold text-blue-600">£8,800</p>
          </div>
          <div className="celeste-box">
            <h3 className="text-2xl font-bold text-gray-900">Growth</h3>
            <p className="mt-2 text-gray-600">Teams up to 200 employees</p>
            <p className="mt-4 text-3xl font-extrabold text-blue-600">£26,000</p>
          </div>
          <div className="celeste-box">
            <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
            <p className="mt-2 text-gray-600">Full org rollout</p>
            <p className="mt-4 text-3xl font-extrabold text-blue-600">£44,000</p>
          </div>
        </div>

        <div className="mt-8">
          <a href="#contact" className="btn-primary">Contact Sales</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Fortivida. All rights reserved.</p>
      </footer>
    </main>
  );
}
