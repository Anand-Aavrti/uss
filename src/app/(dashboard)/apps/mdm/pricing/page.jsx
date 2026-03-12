'use client';
import { useState } from 'react';
import { Check, X, Zap, Shield, Sparkles, ArrowRight, Info } from 'lucide-react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES
   ═══════════════════════════════════════════ */
const CSS = `
  

  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideDown {
    from { opacity:0; transform:translateY(-20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 30px rgba(0,245,255,.3); }
    50%     { box-shadow: 0 0 50px rgba(0,245,255,.5); }
  }
  @keyframes pulse {
    0%,100% { transform:scale(1); opacity:.8; }
    50%     { transform:scale(1.05); opacity:1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes scan {
    0%   { top:-2px; }
    100% { top:102%; }
  }
  @keyframes rotate {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }

  .pricing-root { 
     
    background:#080b12; 
    position:relative; 
    padding: clamp(70px, 10vw, 120px) clamp(20px, 5vw, 80px);
    overflow:hidden;
  }
  .mono { font-family:'Share Tech Mono',monospace; }

  .reveal { opacity:0; animation:fadeInUp .8s cubic-bezier(.22,1,.36,1) forwards; }
  .delay-1 { animation-delay:.1s; }
  .delay-2 { animation-delay:.2s; }
  .delay-3 { animation-delay:.3s; }
  .delay-4 { animation-delay:.4s; }
  .delay-5 { animation-delay:.5s; }

  .pricing-card {
    background:linear-gradient(165deg, rgba(22,27,38,.7) 0%, rgba(12,15,22,.95) 100%);
    border:1px solid rgba(0,245,255,.12);
    border-radius:20px;
    padding:clamp(32px, 4vw, 40px);
    position:relative;
    overflow:hidden;
    transition:all .4s cubic-bezier(.22,1,.36,1);
    height:100%;
    display:flex;
    flex-direction:column;
  }
  .pricing-card:hover {
    transform:translateY(-8px);
    border-color:rgba(0,245,255,.3);
    box-shadow:0 24px 60px rgba(0,245,255,.15);
  }
  .pricing-card.featured {
    border:2px solid rgba(0,245,255,.4);
    background:linear-gradient(165deg, rgba(0,245,255,.08) 0%, rgba(12,15,22,.95) 100%);
  }
  .pricing-card.featured::before {
    content:'';
    position:absolute;
    inset:0;
    background:linear-gradient(135deg, rgba(0,245,255,.12) 0%, transparent 60%);
    pointer-events:none;
  }
 
  .comparison-table {
    width:100%;
    border-collapse:collapse;
    margin-top:60px;
  }
  .comparison-table th {
    padding:20px 16px;
    text-align:left;
    font-weight:700;
    font-size:clamp(0.95rem, 1.1vw, 1.05rem);
    color:#fff;
    background:rgba(0,245,255,.06);
    border:1px solid rgba(0,245,255,.12);
  }
  .comparison-table td {
    padding:16px;
    border:1px solid rgba(0,245,255,.08);
    background:rgba(255,255,255,.02);
    transition:all .3s;
  }
  .comparison-table tr:hover td {
    background:rgba(0,245,255,.04);
  }

  @media (max-width:968px) {
    .pricing-grid { 
      grid-template-columns:1fr !important; 
      gap:24px !important;
    }
    .comparison-table { overflow-x:auto; display:block; }
  }
`;

/* ═══════════════════════════════════════════
   PRICING CARD COMPONENT
   ═══════════════════════════════════════════ */
function PricingCard({ plan, delay, featured = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`pricing-card ${featured ? 'featured' : ''} reveal delay-${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scan line */}
      {featured && <div className="scan-line" />}

      {/* Popular badge */}
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
            color: '#080b12',
            fontSize: 11,
            fontWeight: 700,
            padding: '6px 14px',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        >
          <Sparkles size={14} strokeWidth={2.5} />
          <span className="mono">MOST POPULAR</span>
        </div>
      )}

      {/* Plan icon */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${plan.color}33, ${plan.color}11)`,
          border: `2px solid ${plan.color}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          transition: 'transform .4s',
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
        }}
      >
        {plan.icon}
      </div>

      {/* Plan name */}
      <h3
        style={{
          fontSize: 'clamp(1.4rem, 1.8vw, 1.6rem)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: 8,
        }}
      >
        {plan.name}
      </h3>

      {/* Plan description */}
      <p
        style={{
          fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,.55)',
          marginBottom: 24,
        }}
      >
        {plan.description}
      </p>

      {/* Pricing */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
          <span
            style={{
              fontSize: 'clamp(2.8rem, 4vw, 3.6rem)',
              fontWeight: 700,
              color: plan.color,
            }}
          >
            {plan.price}
          </span>
          {plan.price !== 'Custom' && (
            <span
              className="mono"
              style={{ fontSize: 'clamp(1rem, 1.1vw, 1.1rem)', color: 'rgba(255,255,255,.4)' }}
            >
              /month
            </span>
          )}
        </div>
        <p
          className="mono"
          style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '.3px' }}
        >
          {plan.billing}
        </p>
      </div>

      {/* CTA Button */}
      <button
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: featured ? 'linear-gradient(135deg, #00f5ff, #0099dd)' : 'rgba(0,245,255,.1)',
          color: featured ? '#080b12' : '#00f5ff',
          border: featured ? 'none' : '1px solid rgba(0,245,255,.3)',
           
          fontWeight: 700,
          fontSize: '1rem',
          padding: '14px 28px',
          borderRadius: 10,
          cursor: 'pointer',
          transition: 'all .3s',
          marginBottom: 28,
        }}
        onMouseEnter={(e) => {
          if (featured) {
            e.currentTarget.style.filter = 'brightness(1.15)';
          } else {
            e.currentTarget.style.background = 'rgba(0,245,255,.15)';
          }
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          if (featured) {
            e.currentTarget.style.filter = 'brightness(1)';
          } else {
            e.currentTarget.style.background = 'rgba(0,245,255,.1)';
          }
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {plan.cta}
        <ArrowRight size={18} strokeWidth={2.5} />
      </button>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,.2), transparent)',
          marginBottom: 24,
        }}
      />

      {/* Features list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {plan.features.map((feature, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                background: `${plan.color}22`,
                border: `1px solid ${plan.color}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <Check size={14} color={plan.color} strokeWidth={3} />
            </div>
            <span
              style={{
                fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
                lineHeight: 1.5,
                color: 'rgba(255,255,255,.75)',
              }}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURE COMPARISON TABLE
   ═══════════════════════════════════════════ */
function ComparisonTable({ plans }) {
  const comparisonFeatures = [
    {
      category: 'Core Features',
      features: [
        { name: 'Device Management', starter: true, professional: true, enterprise: true },
        {
          name: 'Multi-Platform Support',
          starter: '2 platforms',
          professional: '3 platforms',
          enterprise: 'Unlimited',
        },
        {
          name: 'User Seats',
          starter: '5 users',
          professional: '25 users',
          enterprise: 'Unlimited',
        },
        {
          name: 'Device Limit',
          starter: '50 devices',
          professional: '500 devices',
          enterprise: 'Unlimited',
        },
      ],
    },
    {
      category: 'Security & Compliance',
      features: [
        { name: 'Zero-Trust Security', starter: true, professional: true, enterprise: true },
        { name: 'Advanced Threat Detection', starter: false, professional: true, enterprise: true },
        { name: 'Custom Security Policies', starter: false, professional: true, enterprise: true },
        { name: 'SOC 2 Compliance', starter: false, professional: false, enterprise: true },
        { name: 'HIPAA Compliance', starter: false, professional: false, enterprise: true },
      ],
    },
    {
      category: 'Monitoring & Analytics',
      features: [
        { name: 'Real-time Monitoring', starter: true, professional: true, enterprise: true },
        { name: 'Advanced Analytics', starter: false, professional: true, enterprise: true },
        { name: 'Custom Reports', starter: false, professional: true, enterprise: true },
        { name: 'API Access', starter: false, professional: 'Limited', enterprise: 'Full' },
      ],
    },
    {
      category: 'Support',
      features: [
        { name: 'Email Support', starter: true, professional: true, enterprise: true },
        { name: 'Priority Support', starter: false, professional: true, enterprise: true },
        {
          name: 'Dedicated Account Manager',
          starter: false,
          professional: false,
          enterprise: true,
        },
        { name: '24/7 Phone Support', starter: false, professional: false, enterprise: true },
        { name: 'SLA Guarantee', starter: false, professional: '99.5%', enterprise: '99.9%' },
      ],
    },
  ];

  const renderCell = (value, color) => {
    if (value === true) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Check size={20} color={color} strokeWidth={2.5} />
        </div>
      );
    }
    if (value === false) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <X size={20} color="rgba(255,255,255,.2)" strokeWidth={2} />
        </div>
      );
    }
    return (
      <span
        className="mono"
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,.7)',
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="reveal delay-5" style={{ marginTop: 80 }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h3
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 12,
          }}
        >
          Feature Comparison
        </h3>
        <p
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
            color: 'rgba(255,255,255,.5)',
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          Compare all features across our plans to find the perfect fit for your organization
        </p>
      </div>

      {/* Table wrapper */}
      <div style={{ overflowX: 'auto' }}>
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{ minWidth: 220, textAlign: 'left' }}>
                <span className="mono" style={{ fontSize: 12, letterSpacing: '.5px' }}>
                  FEATURES
                </span>
              </th>
              {plans.map((plan, i) => (
                <th
                  key={i}
                  style={{
                    minWidth: 140,
                    textAlign: 'center',
                    background: i === 1 ? 'rgba(0,245,255,.1)' : 'rgba(0,245,255,.06)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ color: plan.color }}>{plan.name}</span>
                    <span
                      style={{
                        fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                        fontWeight: 700,
                        color: plan.color,
                      }}
                    >
                      {plan.price}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((category, catIndex) => (
              <>
                <tr key={`cat-${catIndex}`}>
                  <td
                    colSpan={4}
                    style={{
                      background: 'rgba(0,245,255,.08)',
                      fontWeight: 700,
                      fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
                      color: '#00f5ff',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#00f5ff',
                          boxShadow: '0 0 8px #00f5ff',
                        }}
                      />
                      {category.category}
                    </div>
                  </td>
                </tr>
                {category.features.map((feature, featIndex) => (
                  <tr key={`feat-${catIndex}-${featIndex}`}>
                    <td
                      style={{
                        fontSize: 'clamp(0.9rem, 1vw, 0.95rem)',
                        color: 'rgba(255,255,255,.7)',
                      }}
                    >
                      {feature.name}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {renderCell(feature.starter, plans[0].color)}
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                        background: 'rgba(0,245,255,.03)',
                      }}
                    >
                      {renderCell(feature.professional, plans[1].color)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {renderCell(feature.enterprise, plans[2].color)}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom note */}
      <div
        style={{
          marginTop: 32,
          padding: '20px 24px',
          background: 'rgba(0,245,255,.04)',
          border: '1px solid rgba(0,245,255,.15)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <Info size={20} color="#00f5ff" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
        <p
          style={{
            fontSize: 'clamp(0.9rem, 1vw, 0.95rem)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,.65)',
          }}
        >
          All plans include free migration assistance, SSL encryption, automated backups, and access
          to our knowledge base. Need a custom solution?{' '}
          <span style={{ color: '#00f5ff', fontWeight: 600 }}>Contact our sales team</span> for
          enterprise pricing.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started with device management',
      price: '$49',
      billing: 'Billed monthly • $470 annually',
      cta: 'Start Free Trial',
      color: '#00e676',
      icon: <Zap size={32} color="#00e676" strokeWidth={2} />,
      features: [
        'Up to 50 devices',
        '5 user seats',
        '2 platform support (iOS/Android)',
        'Basic security policies',
        'Email support',
        'Mobile app access',
        'Real-time monitoring',
      ],
    },
    {
      name: 'Professional',
      description: 'For growing businesses that need advanced features and scalability',
      price: '$199',
      billing: 'Billed monthly • $1,910 annually (20% off)',
      cta: 'Start Free Trial',
      color: '#00f5ff',
      icon: <Shield size={32} color="#00f5ff" strokeWidth={2} />,
      features: [
        'Up to 500 devices',
        '25 user seats',
        'All 3 platforms (iOS/Android/Windows)',
        'Advanced threat detection',
        'Custom security policies',
        'Priority support',
        'Advanced analytics & reporting',
        'API access',
      ],
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations with complex requirements',
      price: 'Custom',
      billing: 'Tailored to your needs',
      cta: 'Contact Sales',
      color: '#ffb300',
      icon: <Sparkles size={32} color="#ffb300" strokeWidth={2} />,
      features: [
        'Unlimited devices',
        'Unlimited users',
        'Full platform support + custom integrations',
        'SOC 2 & HIPAA compliance',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom SLA (99.9% uptime)',
        'White-label options',
      ],
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="pricing-root">
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,245,255,.01) 0px, transparent 1px, transparent 52px), repeating-linear-gradient(90deg, rgba(0,245,255,.01) 0px, transparent 1px, transparent 52px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-15%',
            width: '50%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
            {/* Badge */}
            <div className="reveal delay-1" style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(0,245,255,.08)',
                  border: '1px solid rgba(0,245,255,.25)',
                  borderRadius: 20,
                  padding: '6px 16px',
                }}
              >
                <Sparkles size={16} color="rgba(0,245,255,.9)" strokeWidth={2.5} />
                <span
                  className="mono"
                  style={{ fontSize: 11, color: 'rgba(0,245,255,.9)', letterSpacing: '.5px' }}
                >
                  FLEXIBLE PRICING
                </span>
              </div>
            </div>

            {/* Title */}
            <h2
              className="reveal delay-2"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 18,
              }}
            >
              <span style={{ color: '#fff' }}>Choose Your</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00f5ff 0%, #00e676 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Perfect Plan
              </span>
            </h2>

            {/* Subtitle */}
            <p
              className="reveal delay-3"
              style={{
                fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,.5)',
                maxWidth: 680,
                margin: '0 auto',
              }}
            >
              Scale as you grow. All plans include 14-day free trial with full feature access.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div
            className="pricing-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(24px, 3vw, 32px)',
              marginBottom: 40,
            }}
          >
            {plans.map((plan, i) => (
              <PricingCard key={i} plan={plan} delay={i + 1} featured={i === 1} />
            ))}
          </div>

          {/* Feature Comparison Table */}
          <ComparisonTable plans={plans} />
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,.3), transparent)',
          }}
        />
      </section>
    </>
  );
}
