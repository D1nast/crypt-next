import "./globals.css";
import Header from './component/header';
import Footer from './component/footer';

// Amplifyのバックエンドとの接続に必要なセッティング
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
Amplify.configure(outputs);


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
  
    );
  }
  
  