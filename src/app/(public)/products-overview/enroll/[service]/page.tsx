'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type AuthUser = {
  displayName?: string;
  email?: string;
  tenantId?: string;
  userId?: string;
  role?: string;
  token?: string;
  services?: string[];
};

type EnrollmentFormData = {
  serviceId: string;
  serviceName: string;
  fullName: string;
  email: string;
  tenantId: string;
  company: string;
  teamSize: string;
  useCase: string;
  contactPhone: string;
};

const SERVICE_API_URL =
  'https://us-central1-mdm-aavrti-engine.cloudfunctions.net/service/api/v1/service';

const serviceCatalog: Record<string, { name: string; subtitle: string; appUrl: string }> = {
  'uss-mdm': {
    name: 'USS MDM',
    subtitle: 'Enroll your organization devices and start policy control.',
    appUrl: '/apps/mdm',
  },
  'uss-video-sdk': {
    name: 'USS Video SDK',
    subtitle: 'Enroll your product team and start secure real-time video integration.',
    appUrl: '/apps/video-sdk',
  },
};

export default function ServiceEnrollmentPage() {
  const params = useParams<{ service: string }>();
  const router = useRouter();
  const serviceId = params?.service ?? '';

  const service = serviceCatalog[serviceId] ?? {
    name: 'USS Service',
    subtitle: 'Enroll to start using this service.',
    appUrl: '/products-overview',
  };

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<EnrollmentFormData>({
    serviceId,
    serviceName: service.name,
    fullName: '',
    email: '',
    tenantId: '',
    company: '',
    teamSize: '1-10',
    useCase: '',
    contactPhone: '',
  });

  useEffect(() => {
    const ussUser = localStorage.getItem('uss_user');
    if (!ussUser) {
      setIsSubmitting(false);
      router.push('/auth?redirect=/products-overview');
      return;
    }

    try {
      const user = JSON.parse(ussUser) as AuthUser;
      setFormData((prev) => ({
        ...prev,
        fullName: user.displayName ?? '',
        email: user.email ?? '',
        tenantId: user.tenantId ?? '',
        company: user.displayName ?? '',
      }));
    } catch {
      localStorage.removeItem('uss_user');
      router.push('/auth?redirect=/products-overview');
      return;
    } finally {
      setIsLoadingUser(false);
    }
  }, [router]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceId,
      serviceName: service.name,
    }));
  }, [serviceId, service.name]);

  const canSubmit = useMemo(() => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.tenantId.trim() &&
      formData.company.trim() &&
      formData.useCase.trim()
    );
  }, [formData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess('');

    const ussUser = localStorage.getItem('uss_user');
    if (!ussUser) {
      router.push('/auth?redirect=/products-overview');
      return;
    }

    try {
      const sessionUser = JSON.parse(ussUser) as AuthUser;
      if (!sessionUser?.token) {
        setSubmitError('Session token missing. Please login again.');
        router.push('/auth?redirect=/products-overview');
        return;
      }

      const payload = {
        serviceName: formData.serviceName,
        name: formData.serviceName,
        serviceId: formData.serviceId,
        tenantId: formData.tenantId,
        status: 'active',
        enrolledAt: new Date().toISOString(),
        enrolledBy: {
          userId: sessionUser.userId ?? null,
          email: formData.email,
          displayName: formData.fullName,
          role: sessionUser.role ?? 'admin',
        },
        organization: {
          company: formData.company,
          teamSize: formData.teamSize,
        },
        contact: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.contactPhone || null,
        },
        details: {
          useCase: formData.useCase,
        },
      };

      const response = await fetch(SERVICE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionUser.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = 'Failed to create service enrollment.';
        try {
          const errorData = await response.json();
          message = errorData?.message || message;
        } catch {
          message = `Failed to create service enrollment (${response.status}).`;
        }
        throw new Error(message);
      }

      const responseData = await response.json();
      console.info('Service enrollment created:', responseData);

      const updatedServices = Array.from(
        new Set([...(sessionUser.services ?? []), formData.serviceId])
      );
      localStorage.setItem(
        'uss_user',
        JSON.stringify({
          ...sessionUser,
          services: updatedServices,
        })
      );

      setSubmitSuccess(
        `${service.name} was created successfully. Redirecting you to the service console...`
      );

      setTimeout(() => {
        router.push(service.appUrl);
      }, 1200);
    } catch (error) {
      console.error('Service enrollment error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Enrollment request failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white pt-[110px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">Loading enrollment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white pt-[110px] pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push('/products-overview')}
          className="mb-6 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          Back to Products
        </button>

        <div className="rounded-2xl border border-[#0EA5E9]/30 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{service.name} Enrollment</h1>
          <p className="text-white/70 mb-6">{service.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder="Full Name"
                className="w-full rounded-xl bg-[#0B1220]/80 border border-white/15 px-4 py-3 outline-none focus:border-[#0EA5E9]"
              />
              <input
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Work Email"
                type="email"
                className="w-full rounded-xl bg-[#0B1220]/80 border border-white/15 px-4 py-3 outline-none focus:border-[#0EA5E9]"
              />
              <input
                value={formData.tenantId}
                onChange={(e) => setFormData((prev) => ({ ...prev, tenantId: e.target.value }))}
                placeholder="Tenant ID"
                className="w-full rounded-xl bg-[#0B1220]/80 border border-white/15 px-4 py-3 outline-none focus:border-[#0EA5E9]"
              />
              <input
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="Company"
                className="w-full rounded-xl bg-[#0B1220]/80 border border-white/15 px-4 py-3 outline-none focus:border-[#0EA5E9]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={formData.teamSize}
                onChange={(e) => setFormData((prev) => ({ ...prev, teamSize: e.target.value }))}
                className="w-full rounded-xl bg-[#0B1220]/80 border border-white/15 px-4 py-3 outline-none focus:border-[#0EA5E9]"
              >
                <option value="1-10">1-10 users</option>
                <option value="11-50">11-50 users</option>
                <option value="51-200">51-200 users</option>
                <option value="201+">201+ users</option>
              </select>
              <input
                value={formData.contactPhone}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="Contact Phone (optional)"
                className="w-full rounded-xl bg-[#0B1220]/80 border border-white/15 px-4 py-3 outline-none focus:border-[#0EA5E9]"
              />
            </div>

            <textarea
              value={formData.useCase}
              onChange={(e) => setFormData((prev) => ({ ...prev, useCase: e.target.value }))}
              placeholder="Describe your use case"
              rows={4}
              className="w-full rounded-xl bg-[#0B1220]/80 border border-white/15 px-4 py-3 outline-none focus:border-[#0EA5E9]"
            />

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
            </button>
          </form>

          {submitError && (
            <div className="mt-5 rounded-xl border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-rose-200">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="mt-5 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-emerald-200">
              {submitSuccess}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
