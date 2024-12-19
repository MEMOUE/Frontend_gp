import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import UserProfile from '../components/UserProfile.vue';
import EditProfile from '../components/EditProfile.vue';
import CompagnieTransportList from '@/components/archives_tmt/CompagnieTransportList.vue';
import CompagnieTransportForm from '../components/archives_tmt/CompagnieTransportForm.vue';
import TransporteurForm from '@/components/TransporteurForm.vue';
import ListeTransporteurs from '@/components/ListeTransporteurs.vue';
import ListeAgence from '@/components/archives_tmt/ListeAgence.vue';
import ProgrammeVoyageForm from '@/components/ProgrammeVoyageForm.vue';
import ProgrammeVoyageList from '@/components/ProgrammeVoyageList.vue';
import AgenceEmballageList from '@/components/archives_tmt/AgenceEmballageList.vue';
import NotificationComposant from '@/components/NotificationComposant.vue';
import OffreList from '@/components/OffreList.vue';
import OffreForm from '@/components/OffreForm.vue';
import PasswordResetRequest from '@/components/PasswordResetRequest.vue';
import PasswordResetConfirm from '@/components/PasswordResetConfirm.vue';
import VerifyEmail from '@/components/VerifyEmail.vue';
import PubliciteAnnonce from '@/components/PubliciteAnnonce.vue';
import UserDashboard from '@/components/UserDashboard.vue';
import FactureComponent from '@/components/FactureComponent.vue';
import ChangePassword from '@/components/ChangePassword.vue';
import FooterComponent from '@/components/FooterComponent.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: UserLogin },
  { path: '/register', component: UserRegister },
  { path: '/profile', component: UserProfile },
  { path: '/edit-profile', component: EditProfile },
  { path: '/agences', component: ListeAgence },
  { path: '/emballages/', component: AgenceEmballageList },
  { path: '/besoin-notifications', component: NotificationComposant },
  { path: '/offres', component: OffreList },
  { path: '/offres/create', component: OffreForm },
  { path: '/offres/edit/:id', component: OffreForm },
  { path: '/dashboard', component: UserDashboard },
  {path: '/change-password', component: ChangePassword},
  {path: '/footer', component: FooterComponent},
  {
    path: '/compagnies',
    name: 'CompagnieTransportList',
    component: CompagnieTransportList
  },
  {
    path: '/compagnies/create',
    name: 'CompagnieTransportCreate',
    component: CompagnieTransportForm
  },
  {
    path: '/compagnies/edit/:id',
    name: 'CompagnieTransportEdit',
    component: CompagnieTransportForm
  },
  {
    path: '/transporteurs',
    name: 'ListeTransporteurs',
    component: ListeTransporteurs,
  },
  {
    path: '/transporteurs/create',
    name: 'CreateTransporteur',
    component: TransporteurForm,
  },
  {
    path: '/transporteurs/edit/:id',
    name: 'EditTransporteur',
    component: TransporteurForm,
    props: true,
  },
  {
    path: '/programmes',
    name: 'ProgrammeVoyageList',
    component: ProgrammeVoyageList,
  },
  {
    path: '/programmes/new',
    name: 'ProgrammeVoyageForm',
    component: ProgrammeVoyageForm,
  },
  {
    path: '/programmes/:id/edit',
    name: 'ProgrammeVoyageEdit',
    component: ProgrammeVoyageForm,
  },
  {
    path: '/password-reset',
    name: 'PasswordResetRequest',
    component: PasswordResetRequest
  },
  {
    path: '/password-reset-confirm/:token',
    name: 'PasswordResetConfirm',
    component: PasswordResetConfirm,
    props: true
  },  
  {
    path: '/verify-email/:token',
    name: 'VerifyEmail',
    component: VerifyEmail,
  },
  {
    path: '/publicite',
    name: 'PubliciteAnnonce',
    component: PubliciteAnnonce
  },
  {
    path: '/facture',
    name: 'FactureComponent',
    component: FactureComponent
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;