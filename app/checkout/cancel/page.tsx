import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { redirect } from 'next/navigation';

export default function CancelPage() {
  redirect('/cart');
}
