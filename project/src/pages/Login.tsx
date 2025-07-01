import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Données de connexion:', data);
      alert('Connexion réussie !');
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="bg-warm-gray min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* En-tête */}
          <div className="text-center mb-8">
            <User className="h-12 w-12 text-golden-orange mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-forest-green">Connexion</h2>
            <p className="text-gray-600 mt-2">Accédez à votre espace client</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-forest-green mb-2">
                <Mail className="h-4 w-4" />
                <span>Adresse email</span>
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="votre@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-forest-green mb-2">
                <Lock className="h-4 w-4" />
                <span>Mot de passe</span>
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-golden-orange focus:ring-golden-orange border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-golden-orange hover:text-golden-orange/80 transition-colors duration-200">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-golden-orange text-white font-medium py-3 px-4 rounded-lg hover:bg-golden-orange/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Liens */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-golden-orange hover:text-golden-orange/80 transition-colors duration-200 font-medium">
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Accès rapide au tableau de bord */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              to="/dashboard"
              className="w-full bg-forest-green text-white font-medium py-2 px-4 rounded-lg hover:bg-forest-green/90 transition-colors duration-200 text-center block"
            >
              Accéder au tableau de bord (démo)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;