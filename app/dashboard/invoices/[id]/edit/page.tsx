import React from 'react';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import {fetchCustomers, fetchInvoiceById} from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {notFound} from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const invoiceId = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(invoiceId),
    fetchCustomers()
  ])

  if (!invoice) {
    notFound()
  }

  return (
    <div>
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
              label: 'Edit Invoice',
              href: `/dashboard/invoices/${invoiceId}/edit`,
              active: true,
            },
          ]}
        />
        <EditInvoiceForm invoice={invoice} customers={customers} />
      </main>
    </div>
  );
}