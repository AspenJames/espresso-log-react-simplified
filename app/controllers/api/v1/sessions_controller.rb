module Api
  module V1
    class SessionsController < ApplicationController

      def create
        @cs = CoffeeShop.find_by(:email => params[:coffee_shop][:email])
        if @cs.try(:authenticate, params[:coffee_shop][:password])
          session[:id] = @cs.id
          render :json => @cs
        else
          render :json => {"error": "email or password incorrect"}
        end
      end

      def destroy
        @cs = CoffeeShop.find(session[:id])
        session.clear
        render :json => {"message": "logged out #{@cs.name}"}
      end

    end
  end
end
