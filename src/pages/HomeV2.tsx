import React from 'react';
import ProptiiNohoHero from '../components/home/ProptiiNohoHero';
import ProptiiTwoPlatforms from '../components/home/ProptiiTwoPlatforms';
import ProptiiCapabilities from '../components/home/ProptiiCapabilities';
import ProptiiSocialProof from '../components/home/ProptiiSocialProof';
import ProptiiStudioShowcase from '../components/home/ProptiiStudioShowcase';
import ProptiiTerminalCTA from '../components/home/ProptiiTerminalCTA';

export default function HomeV2() {
  return (
    <div className="bg-white text-gray-900 selection:bg-[#DC5F12]/15 selection:text-[#DC5F12]">
      
      {/* =========================================================================
          SECTION 1: THE FLAGSHIP HERO
          Noho-inspired 7-card 3D flip collage, bottom-direct insert ("With Proptii,"),
          3 dynamic scroll subtexts with UK flood risk layer, zero sister products.
         ========================================================================= */}
      <ProptiiNohoHero />

      {/* =========================================================================
          SECTION 2: TWO PLATFORMS (ELEVENLABS STYLE)
          Two broad use cases: Services for Tenants and for Agents/Landlords,
          featuring real production screenshots of Tenant Dashboard & Agent Analytics.
         ========================================================================= */}
      <ProptiiTwoPlatforms />

      {/* =========================================================================
          SECTION 3: CORE CAPABILITIES
          4 focused capability blocks detailing how Proptii solves the investor
          workflow end-to-end (sourcing, compliance, underwriting, environmental GIS).
         ========================================================================= */}
      <ProptiiCapabilities />

      {/* =========================================================================
          SECTION 4: SOCIAL PROOF & VALIDATION
          User metrics (£140M+ underwritten, 99.1% precision), statutory compliance
          badges (Environment Agency, HM Land Registry, RICS, ISO 27001), and testimonial.
         ========================================================================= */}
      <ProptiiSocialProof />

      {/* =========================================================================
          SECTION 5: PRE-FOOTER STUDIO SHOWCASE
          Modular transition borrowing studio authority:
          "Built by the makers of Council Connect and Nest Quest."
         ========================================================================= */}
      <ProptiiStudioShowcase />

      {/* =========================================================================
          SECTION 6: TERMINAL CONVERSION
          Final high-contrast signup card anchored above the structured 4-column footer.
         ========================================================================= */}
      <ProptiiTerminalCTA />

    </div>
  );
}
