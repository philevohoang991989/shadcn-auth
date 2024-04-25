import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import LocaleSwitcher from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { MainNav } from './main-nav'

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <MainNav/>
    </header>
  )
}
